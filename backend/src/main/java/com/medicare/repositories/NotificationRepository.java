package com.medicare.repositories;

import com.medicare.models.Notification;
import com.medicare.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    public Set<Notification> findByUser(User user);
}