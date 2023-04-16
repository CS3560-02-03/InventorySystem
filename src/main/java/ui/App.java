package main.java.ui;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;

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

        //set application icon
        ImageIcon icon = new ImageIcon(".\\src\\main\\java\\ui\\resource\\img\\appicon.png");
        frame.setIconImage(icon.getImage());        

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
