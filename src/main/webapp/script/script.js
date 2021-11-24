const SCRIPT_URL = "/";
var timestamp = 0;

jQuery(document).ready(function ($) {

    class SvgDrawer {
        constructor(svg, delta_x, delta_y, delta_r,) {
            this.svg = svg;
            this.delta_x = delta_x;
            this.delta_y = delta_y;
            this.delta_r = delta_r;
        }

        drawPoint(x, y, init_r, current_r, color, id=null) {
            let newCircle = `
                <circle
                    xmlns="http://www.w3.org/2000/svg"
                    class="ad-circle"
                    cx="${this.svgCoordX(x, current_r)}"
                    cy="${this.svgCoordY(y, current_r)}"
                    data-x="${x}"
                    data-y="${y}"
                    data-r="${init_r}"
                    fill="${color}"
                    r="5"
                    ${id === null ? "" : ',data-id="' + id + '"'}
                />
            `;

            $(this.svg).append(newCircle);
        }

        drawPointFromCoords(coord_x, coord_y, init_r, color, id=null) {
            coord_x = (400 / $(this.svg).width()) * coord_x;
            coord_y = (400 / $(this.svg).width()) * coord_y;
            let x = (coord_x - this.delta_x) * init_r / this.delta_r;
            let y = (-(coord_y - this.delta_y)) * init_r / this.delta_r;
            x = x.toFixed(2);
            y = y.toFixed(2);
            let newCircle = `
                <circle
                    xmlns="http://www.w3.org/2000/svg"
                    class="ad-circle"
                    cx="${coord_x}"
                    cy="${coord_y}"
                    data-x="${x}"
                    data-y="${y}"
                    data-r="${init_r}"
                    fill="${color}"
                    r="5"
                    ${id === null ? "" : 'data-id="' + id + '"'}
                />
            `;
            console.log(newCircle);
            $(this.svg).append(newCircle);
            return [x, y];
        }

        deletePoint(id) {
            $(this.svg).find(`[data-id="${id}"]`).remove();
        }

        svgCoordX(coord_x, current_r) {
            coord_x = parseFloat(coord_x);
            current_r = parseFloat(current_r);
            return coord_x / current_r * this.delta_r + this.delta_x;
        }

        svgCoordY(coord_y, current_r) {
            coord_y = parseFloat(coord_y);
            current_r = parseFloat(current_r);
            return -(coord_y / current_r * this.delta_r) + this.delta_y;
        }

        redrawCircles() {
            let current_r = parseFloat($('input[name="radio"]:checked').val());
            var svgCoordX = this.svgCoordX.bind(this);
            var svgCoordY = this.svgCoordY.bind(this);
            $(this.svg).find(".ad-circle").each(function() {
                let x = parseFloat($(this).data("x"));
                let y = parseFloat($(this).data("y"));
                $(this).attr("cx", svgCoordX(x, current_r));
                $(this).attr("cy", svgCoordY(y, current_r));
            })

            $(this.svg).find(".R").text( (current_r).toFixed(1) );
            $(this.svg).find(".hR").text( (current_r / 2).toFixed(2) );
            $(this.svg).find(".mR").text( (-current_r).toFixed(1) );
            $(this.svg).find(".mhR").text( (-current_r / 2).toFixed(2) );
        }

        clean() {
            $(this.svg).find(".ad-circle").remove();
        }
    }

    class GraphWorker {
        constructor(graphDrawer) {
            this.graphDrawer = graphDrawer;
        }

        addCircle(json) {
            json = JSON.parse(json);
            let x = parseFloat(json["x"].replace(",", "."));
            let y = parseFloat(json["y"].replace(",", "."));
            let r = parseFloat(json["r"].replace(",", "."));
            let hit = String(json["hit"]) === "true";
            let color = hit ? "green" : "red";

            let current_r = $('input[name="radio"]:checked').val();

            this.graphDrawer.drawPoint(x, y, r, current_r, color);
        }

        redrawCircles() {
            this.graphDrawer.redrawCircles()
        }

        clean() {
            this.graphDrawer.clean()
        }
    }

    class TableWorker {
        constructor(table) {
            this.table = table;
        }

        addTableRow(json) {
            json = JSON.parse(json);
            let x = parseFloat(json["x"].replace(",", ".")).toFixed(2);
            let y = parseFloat(json["y"].replace(",", ".")).toFixed(2);
            let r = parseFloat(json["r"].replace(",", ".")).toFixed(1);
            let hit = String(json["hit"]) === "true";
            let hit_text = hit ? "Попадание" : "Промах";
            let newRow = `
                <tr class="hit${hit ? "1" : "0"}">
                    <td>(${x}, ${y})</td>
                    <td>${r}</td>
                    <td>${json["script_time"] ? json["script_time"] + "ms" : "-"}</td>
                    <td>${json["current_time"]}</td>
                    <td>${hit_text}</td>
                </tr>
                `;
            $(this.table).append(newRow);
        }
    }


// Функция загрузки таблицы и графика из сессии
    function loadTableGraph(tableWorker, graphWorker) {
        $.ajax({
            type: "GET",
            url: SCRIPT_URL,
            data: {
                "type": "getjson"
            },
            success: (resp, e) => {
                for (res of resp) {
                    console.log(res)
                    res = JSON.stringify(res);
                    tableWorker.addTableRow(res);
                    graphWorker.addCircle(res);
                }
            },
            error: (resp, e) => {
                $("#error-box").text("Непредвиденная ошибка");
            },
            dataType: "json"
        });
    }

    window.onload = () => {
        const table = $("#result-table tbody");
        const svg = document.getElementById('graph')
            .contentDocument
            .getElementById("graphsvg");
        const tableWorker = new TableWorker(table);
        const svgDrawer = new SvgDrawer(
            svg,
            200,
            200,
            158
        );
        const graphWorker = new GraphWorker(svgDrawer);

        loadTableGraph(tableWorker, graphWorker);
        // Валидация Y
        $("#ycord").on("input", function () {
            let val = $("#ycord").val()
            val = val.replace(/[^(0-9\.\,\-)]+/g, "") // Убирает все символы кроме [цифр . , -]
            val = val.replace(/[\.\,]{1,}/, '.'); // Заменяет все точки и запятые на одну точку
            val = val.replace(/(?<=(.+\..+))(\.+)/, '') // Убирает все точки поставленные после первой
            val = val.replace(/(?<=(.+))(-+)/, '') // Убирает все лишние минусы
            if (val != "-") {
                while(val && !(parseFloat(val) <= 3 && parseFloat(val) >= -5)) {
                    val = val.slice(0, -1)
                }
            }

            $("#ycord").val(val)
        });

        // Валидация X
        $("#xcord").on("input", function() {
            let val = $("#xcord").val()
            val = val.replace(/[^(0-9\-)]+/g, "") // Убирает все символы кроме [цифр -]
            if (val != "-") {
                while(val && !(parseInt(val) <= 5 && parseInt(val) >= -3)) {
                    val = val.slice(0, -1)
                }
            }
            $("#xcord").val(val)
        });

        // Отправка данных на сервер
        $("#form").on("submit", function() {
            let xval = $('#xcord').val();
            let yval = $("#ycord").val();
            let rval = $('input[name="radio"]:checked').val();
            $("#error-box").text("");
            if (xval == "" || yval == "" || rval == "") {
                $("#error-box").text("Ошибка! Заполните все поля");
            } else {
                timestamp = Date.now();
                $.ajax({
                    type: "GET",
                    url: SCRIPT_URL,
                    data: {
                        "type": "coords",
                        "x": xval,
                        "y": yval,
                        "r": rval,
                        "time": (new Date()).getTimezoneOffset()
                    },
                    success: function(res) {
                        timestamp = Date.now() - timestamp;
                        if ("error" in res) {
                            $("#error-box").text("Ошибочка вышла, отправте нормально данные через форму")
                        } else {
                            res["script_time"] = timestamp;
                            let json = JSON.stringify(res);
                            tableWorker.addTableRow(json);
                            graphWorker.addCircle(json);
                        }
                    },
                    error: (resp, e) => {
                        $("#error-box").text("Непредвиденная ошибка");
                    },
                    dataType: "json"
                })
            }
            return false;
        });

        // Очистка сессии, графа, таблицы
        $("#reset").on("click", function() {
            $.ajax({
                type: "GET",
                url: SCRIPT_URL,
                data: {
                    "type": "clean"
                },
                success: (resp, e) => {
                    $("#result-table tbody").html("");
                    graphWorker.clean();
                },
                error: (resp, e) => {
                    $("#error-box").text("Непредвиденная ошибка");
                },
                dataType: "text"
            })
        });

        $('input[type=radio][name=radio]').on("change", function() {
            graphWorker.redrawCircles();
            $("#error-box").text("");
        });

        let counter = 1;
        $(svg).on("click", function(ev) {

            let id = counter;
            let posX = $(this).offset().left,
                posY = $(this).offset().top;
            let init_r = $('input[name="radio"]:checked').val();
            if (!init_r) {
                $("#error-box").text("Ошибочка вышла, введите радиус");
                return;
            }
            let [x, y] = svgDrawer.drawPointFromCoords(
                ev.pageX - posX,
                ev.pageY - posY,
                init_r,
                "grey",
                id
            );
            console.log(x, y);
            timestamp = Date.now();
            $.ajax({
                type: "GET",
                url: SCRIPT_URL,
                data: {
                    "type": "coords",
                    "x": x,
                    "y": y,
                    "r": init_r,
                    "time": (new Date()).getTimezoneOffset()
                },
                success: function(res) {
                    timestamp = Date.now() - timestamp;
                    if ("error" in res) {
                        $("#error-box").text("Ошибочка вышла, отправте нормально данные через форму")
                    } else {
                        res["script_time"] = timestamp;
                        let json = JSON.stringify(res);
                        tableWorker.addTableRow(json);
                        svgDrawer.deletePoint(id);
                        graphWorker.addCircle(json);
                    }
                },
                error: (resp, e) => {
                    $("#error-box").text("Непредвиденная ошибка");
                },
                dataType: "json"
            })

        });
    }

});