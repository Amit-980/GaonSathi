package com.gaonsathi.backend.service;

import com.gaonsathi.backend.model.User;
import com.gaonsathi.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User createUser(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public User updateUser(Long id, User updatedUser) {

        User user = repo.findById(id).orElseThrow();

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());

        return repo.save(user);
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

}
