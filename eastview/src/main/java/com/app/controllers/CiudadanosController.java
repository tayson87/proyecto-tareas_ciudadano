package com.app.controllers;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.entities.Usuario;
import com.app.services.IUsuarioService;

@Controller
@RequestMapping("/ciudadanos")
public class CiudadanosController {

	@Autowired
	IUsuarioService usuarioService;

	@GetMapping()
	public String getIndexCiud(Model model, Authentication auth, HttpSession sesion) {
		String nombreUsuario = null;
		if (auth != null) {
			nombreUsuario = auth.getName();
			for (GrantedAuthority rol : auth.getAuthorities()) {
				System.out.println("Roles del usuario logueado: " + rol);
			}

		} else {
		}

		if (sesion.getAttribute("usuario") == null) {

			if (nombreUsuario != null) {
				Usuario usuarioCompleto = usuarioService.buscarByUsername(nombreUsuario);
				usuarioCompleto.setPassword(null);
				sesion.setAttribute("usuario", usuarioCompleto);
				System.out.println("Usuario en sesion activo:  ");
				System.out.println(usuarioCompleto.toString());
			}
		}
		model.addAttribute("message", "Hola mundo");
		return "pages/ciudadanos/indexCiudadanos";
	}
	
	@GetMapping("/crear")
	public String crearCiu() {
		
		return "pages/ciudadanos/nuevo-ciudadano";
	}
}
