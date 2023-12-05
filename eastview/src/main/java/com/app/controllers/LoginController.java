package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {

	
	@GetMapping()
	public String getLogin(Model model) {
		
		model.addAttribute("message", "Hola mundo");
		return "pages/login/login";
	}


	
}
