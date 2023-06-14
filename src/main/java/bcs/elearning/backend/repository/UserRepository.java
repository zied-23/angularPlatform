package bcs.elearning.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import bcs.elearning.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {
	  Optional<User> findByUsername(String username);
	  


	  Boolean existsByUsername(String username);

	  Boolean existsByEmail(String email);
	  List<User> findByRolesId(String roleId);
	  List<User> findByRolesIn(List<String> roles);
	}
