package main.java.ui;

import javax.swing.*;

import main.java.ui.resource.AppStrings;
import main.java.ui.resource.AppColors;
public class App {

    public App() {

        //Create app frame and initialize it.
        JFrame frame = new JFrame();
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(640,480);
        frame.setTitle(AppStrings.APP_TITLE);

        JPanel mainPanel = new JPanel();
        mainPanel.setBackground(AppColors.MAIN_BG);
        frame.add(mainPanel);

        //frame.pack();
        frame.setVisible(true);
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new App();
            }
        });
    }
}
