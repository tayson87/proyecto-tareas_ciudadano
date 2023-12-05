package com.app.services;

import com.app.entities.Usuario;

public interface IUsuarioService {

	public Usuario buscarByUsername(String username);
}
