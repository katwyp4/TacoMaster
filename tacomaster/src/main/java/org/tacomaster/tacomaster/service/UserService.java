package org.tacomaster.tacomaster.service;

import org.springframework.stereotype.Service;
import org.tacomaster.tacomaster.model.User;
import org.tacomaster.tacomaster.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}