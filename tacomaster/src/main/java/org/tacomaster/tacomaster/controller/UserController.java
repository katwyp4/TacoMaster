package org.tacomaster.tacomaster.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.tacomaster.tacomaster.model.User;
import org.tacomaster.tacomaster.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        // ustaw domyślną rolę
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        return ResponseEntity.ok(userService.register(user));
    }


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User creds,
                                      HttpServletRequest request,
                                      HttpServletResponse response) {

        return userService.findByEmail(creds.getEmail())
                .filter(u -> passwordEncoder.matches(creds.getPassword(), u.getPassword()))
                .map(u -> {
                    // 1) budujemy Authentication z rolą
                    var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole()));
                    var auth = new UsernamePasswordAuthenticationToken(u.getEmail(), null, authorities);

                    // 2) wkładamy do SecurityContextHolder
                    var context = SecurityContextHolder.createEmptyContext();
                    context.setAuthentication(auth);
                    SecurityContextHolder.setContext(context);

                    // 3) ZAPISUJEMY KONTEKST W SESJI i wysyłamy Set-Cookie
                    new HttpSessionSecurityContextRepository()
                            .saveContext(context, request, response);

                    // 4) usuwamy hasło z obiektu, żeby nie trafiało na front
                    u.setPassword(null);
                    return ResponseEntity.ok(u);
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
