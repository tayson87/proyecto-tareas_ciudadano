package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Método que utiliza JPQL para buscar un usuario por nombre de usuario
    @Query("SELECT u FROM Usuario u WHERE u.username = :username")
    Usuario findByUsername(@Param("username") String username);
}
