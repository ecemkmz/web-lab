package com.example.service;

import com.example.entity.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User saveUser(User user);
    User getUserById(Long id);
    void deleteUserById(Long id);
}
