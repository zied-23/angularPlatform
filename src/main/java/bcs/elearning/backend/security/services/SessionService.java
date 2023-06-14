package bcs.elearning.backend.security.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bcs.elearning.backend.models.Session;
import bcs.elearning.backend.repository.SessionRepository;

@Service
public class SessionService {
	@Autowired
	private final SessionRepository sessionRepository;

    
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session getSessionWithGroupsById(String id) {
        return sessionRepository.findSessionWithGroupsById(id);
    }

    public Optional<Session> getSessionById(String id) {
        return sessionRepository.findById(id);
    }

    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    public void deleteSession(String id) {
        sessionRepository.deleteById(id);
    }
    public List<Session> getSessionsByDate(Date date) {
        return sessionRepository.findByStartDate(date);
    }
}
