package com.app.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Usuario;
import com.app.repositories.IUsuarioRepository;
import com.app.services.IUsuarioService;

@Service
public class UsuarioServiceImp implements IUsuarioService {
  @Autowired
	IUsuarioRepository usuarioRepository;
	@Override
	public Usuario buscarByUsername(String username) {
		Usuario user = usuarioRepository.findByUsername(username);
		return user;
	}

}
