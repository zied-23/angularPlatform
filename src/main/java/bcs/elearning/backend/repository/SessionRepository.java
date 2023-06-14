package bcs.elearning.backend.repository;



import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import bcs.elearning.backend.models.Session;

public interface SessionRepository extends MongoRepository<Session, String> {
	Session findSessionWithGroupsById(String id);

	List<Session> findByStartDate(Date date);

}