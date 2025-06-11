package org.tacomaster.tacomaster.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nazwa użytkownika jest wymagana")
    private String username;

    @Email(message = "Niepoprawny format email")
    @NotBlank(message = "Email jest wymagany")
    private String email;

    @Size(min = 6, message = "Hasło musi mieć minimum 6 znaków")
    private String password;

    private String role;
}
