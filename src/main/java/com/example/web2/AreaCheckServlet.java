package com.example.web2;

import com.example.web2.tools.CoordsParser;
import com.example.web2.tools.Validator;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String response_json;
        try {
            double x = CoordsParser.parseDouble(request.getParameter("x"));
            double y = CoordsParser.parseDouble(request.getParameter("y"));
            double r = CoordsParser.parseDouble(request.getParameter("r"));

            if (!Validator.validateX(x))
                response_json = View.makeError("Error in x");
            else if (!Validator.validateY(y))
                response_json = View.makeError("Error in y");
            else if (!Validator.validateR(r))
                response_json = View.makeError("Error in r");
            else {
                response_json = View.makeSuccess(Model.operate(x, y, r, request.getSession()));
            }
        } catch (NumberFormatException e) {
            response_json = View.makeError("Not valid coords");
        } catch (NullPointerException e) {
            response_json = View.makeError("Not all arguments");
        }


        try (PrintWriter out = response.getWriter()) {
            out.print(response_json);
        }
    }
}
