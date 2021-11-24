package com.example.web2;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestType = request.getParameter("type");
        if (requestType == null) {requestType = "";}
        else {requestType = requestType.trim();}

        if (requestType.equals("coords")) {
            RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher("/areacheck");
            dispatcher.forward(request, response);
        } else if (requestType.equals("clean")) {
            RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher("/clean");
            dispatcher.forward(request, response);
        } else if (requestType.equals("getjson")) {
            RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher("/getjson");
            dispatcher.forward(request, response);
        } else {
            RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher("/index.jsp");
            dispatcher.forward(request, response);
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher("/index.jsp");
        dispatcher.forward(request, response);
    }
}
