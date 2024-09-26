package org.lonic.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers("/api/user/authenticate").permitAll()
                .antMatchers("/api/user/register").permitAll()
                .antMatchers(HttpMethod.GET, "/api/area").hasAnyRole("user", "admin")
                .antMatchers(HttpMethod.POST, "/api/area").hasRole("admin")
                .antMatchers(HttpMethod.PUT, "/api/area/*").hasRole("admin")
                .antMatchers(HttpMethod.DELETE, "/api/area/*").hasRole("admin")
                .antMatchers(HttpMethod.GET, "/api/areaEncounter/*").hasAnyRole("user", "admin")
                .antMatchers(HttpMethod.POST, "/api/areaEncounter/*").hasRole("admin")
                .antMatchers(HttpMethod.PUT, "/api/areaEncounter/*").hasRole("admin")
                .antMatchers(HttpMethod.DELETE, "/api/areaEncounter/*").hasRole("admin")
                .antMatchers(HttpMethod.POST, "/api/pokemonEncounter/*").hasRole("admin")
                .antMatchers(HttpMethod.PUT, "/api/pokemonEncounter/*").hasRole("admin")
                .antMatchers(HttpMethod.DELETE, "/api/pokemonEncounter/*").hasRole("admin")
                .antMatchers(HttpMethod.GET, "/api/pokemon/*").hasAnyRole("user", "admin")
                .antMatchers(HttpMethod.GET, "/api/pokemon/admin/*").hasAnyRole( "admin")
                .antMatchers(HttpMethod.GET, "/api/user").hasAnyRole("user", "admin")
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }
}
