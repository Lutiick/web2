package com.example.web2;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class DataJsonServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String response_json = View.makeSuccessList(Model.getHitsList(request.getSession()));
        try (PrintWriter out = response.getWriter()) {
            out.print(response_json);
        }
    }
}
