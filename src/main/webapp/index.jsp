<%@ page import="com.example.web2.Model" %>
<%@ page import="com.example.web2.HitData" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.Locale" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<% HitData.ListHitsData listHitsData = Model.getHitsList(request.getSession()); %>
<% Iterator<HitData> hitsIterator; %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="image/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <title>HitOrMiss App</title>
</head>
<body>
    <header class="header">
        <h1 class="title">Лабораторная работа №1</h1>
        <div class="discipline">Веб-программирование</div>
        <div class="author">
            <span class="author__label">Работу выполнил:</span>
            <span class="autor__value"><b>Скориков Родион, P3130</b></span>
        </div>
        <div class="variant">
            <span class="variant__label">Номер варианта:</span>
            <b class="variant__value">30014</b>
        </div>
    </header>
    <main class="content">
        <div class="row">
            <div class="graphic">
                <object
                    type="image/svg+xml"
                    data="image/graph.svg"
                    id="graph">
                    </object>
                <svg version="1.1" id="graph_dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 400 400" style="enable-background:new 0 0 400 400;" xml:space="preserve">
                    <% hitsIterator = listHitsData.getIterator(); %>
                    <%
                        double delta_x = 200; // центр графика
                        double delta_y = 200; // центр графика
                        double delta_r = 158;
                        while (hitsIterator.hasNext()) {
                            HitData hitData = hitsIterator.next();
                            double cx = (hitData.getX() / hitData.getR()) * delta_r + delta_x;
                            double cy = (-hitData.getY() / hitData.getR()) * delta_r + delta_y;
                            String color = hitData.getHit() ? "green" : "red";
                    %>
                    <circle
                            xmlns="http://www.w3.org/2000/svg"
                            class="ad-cirle"
                            cx="<%= cx %>"
                            cy="<%= cy %>"
                            fill="<%= color %>"
                            r="5"/>
                    <% } %>
                </svg>

            </div>
            <div class="form-wrapper">
                <form id="form" action="" method="POST">
                    <div class="input-wrapper">
                        <label for="xcord">Введите координату X [-3; 5]</label>
                        <input type="text" name="xcord" id="xcord">
                    </div>
                    <div class="input-wrapper">
                        <label for="ycord">Введите координату Y [-5; 3]</label>
                        <input type="text" name="ycord" id="ycord">
                    </div>
                    <div class="radio-wrapper">
                        <div>
                            Введите радиус R
                        </div>
                        <div>
                            <fieldset>
                                <label for="radio1">1</label>
                                <input type="radio" name="radio" id="radio1" value="1" checked="true">
                                <label for="radio2">1.5</label>
                                <input type="radio" name="radio" id="radio2" value="1.5">
                                <label for="radio3">2</label>
                                <input type="radio" name="radio" id="radio3" value="2">
                                <label for="radio4">2.5</label>
                                <input type="radio" name="radio" id="radio4" value="2.5">
                                <label for="radio5">3</label>
                                <input type="radio" name="radio" id="radio5" value="3">
                            </fieldset>
                        </div>
                    </div>
                    <input id="submit" type="submit" value="Отправить">
                </form>
                <button class="clear" id="reset">Очистить историю</button>
                <div id="error-box">
                    
                </div>
            </div>
        </div>
        <div class="row table-wrapper">
            <div>
                <h2 class="table-title">История запросов</h2>
            </div>
            <table id="result-table">
                <thead>
                    <tr class="tr-head">
                        <th>Координаты</th>
                        <th>Радиус</th>
                        <th>Время выполния</th>
                        <th>Время запроса</th>
                        <th>Попадание</th>
                    </tr>
                </thead>
                <tbody>
                <% hitsIterator = listHitsData.getIterator();%>
                <%
                    while (hitsIterator.hasNext()) {
                        HitData hitData = hitsIterator.next();
                %>
                    <tr class="hit<%= hitData.getHit() ? 0 : 1 %>">
                        <td>
                            (<%= hitData.getX() %>,
                            <%= String.format(Locale.US, "%.2f", hitData.getY())%>>)
                        </td>
                        <td><%= String.format(Locale.US, "%.2f", hitData.getR())%></td>
                        <td><%= hitData.getCurrentTime()%></td>
                        <td></td>
                        <td><%= hitData.getHit() ? "Попадание" : "Промах" %></td>
                    </tr>
                <% } %>
                </tbody>
            </table>
        </div>
    </main>
    <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous">
    </script>
    <script src="script/script.js" type="text/javascript"></script>
</body>
</html>