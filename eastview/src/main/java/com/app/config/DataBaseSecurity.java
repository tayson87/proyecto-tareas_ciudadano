package com.app.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class DataBaseSecurity {

	//private static final Logger logger = LoggerFactory.getLogger(DataBaseSecurity.class);

	@Bean
	UserDetailsManager users(DataSource dataSource) {
		
		JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
		String queryUsers="SELECT username,password,estatus FROM usuarios u WHERE username=?";
		users.setUsersByUsernameQuery(queryUsers);
		String queryAuthorities = "SELECT u.username, p.perfil FROM usuarioperfil up " +
		        "INNER JOIN usuarios u ON u.id = up.idusuario " +
		        "INNER JOIN perfiles p ON p.id = up.idperfil " +
		        "WHERE u.username=?";
		users.setAuthoritiesByUsernameQuery(queryAuthorities);
		return users;
	}

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(authorizeRequests -> authorizeRequests
                .antMatchers("/css/**", "/js/**", "/img/**", "/home", "/signup",
                		"/swagger-ui.html", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
                .antMatchers("/tareas/**").hasAnyAuthority("SUPERVISOR","ADMINISTRADOR")
                .antMatchers("/ciudadanos/**").hasAnyAuthority("SUPERVISOR","ADMINISTRADOR")
                .anyRequest().authenticated()
            )
            .formLogin(login -> login
                .loginPage("/login")
                .permitAll()
                .successHandler(authenticationSuccessHandler())
                .failureUrl("/login?error=true")
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .permitAll()
                .logoutSuccessHandler(logoutSuccessHandler()) // Personaliza la redirección después de cerrar sesión
            )
           
          ;
        return http.build();
    }
    
    @Bean
    AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> response.sendRedirect("/app/home"); // Reemplaza "/tu-contexto" con tu contexto específico
    }

    @Bean
    LogoutSuccessHandler logoutSuccessHandler() {
        return (request, response, authentication) -> response.sendRedirect("/app/login"); // Puedes personalizar la redirección después de cerrar sesión
    }
}
