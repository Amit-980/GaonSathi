package com.gaonsathi.backend.repository;

import com.gaonsathi.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}