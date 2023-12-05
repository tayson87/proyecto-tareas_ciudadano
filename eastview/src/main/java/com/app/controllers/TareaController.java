package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tareas")
public class TareaController {
	
	@GetMapping("/tablero")
	public String tableroTarea() {
		
		return "pages/tareas/tableroTareas";
	}
	

	@GetMapping("/crear")
	public String crearTarea() {
		
		return "pages/tareas/nueva-tarea";
	}
	
	@GetMapping("/asignar-tareas")
	public String traesACiudadanos() {
		
		return "pages/tareas/asignar-tareas";
	}
	
	
}
