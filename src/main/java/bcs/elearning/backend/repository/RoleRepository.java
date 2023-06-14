package bcs.elearning.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import bcs.elearning.backend.models.ERole;
import bcs.elearning.backend.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
	  Optional<Role> findByName(ERole name);
	}