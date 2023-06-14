package bcs.elearning.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import bcs.elearning.backend.models.Group;


public interface GroupRepository extends MongoRepository<Group, String> {
	Optional<Group> findByName(String name);
    List<Group> getGroupsByTrainingId(String trainingId);
}
