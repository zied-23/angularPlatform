package bcs.elearning.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;


import bcs.elearning.backend.models.Training;

public interface TrainingRepository extends MongoRepository<Training, String> {
	Optional<Training> findByName(String name);
}
