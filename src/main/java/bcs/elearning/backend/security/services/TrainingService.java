package bcs.elearning.backend.security.services;

import java.util.List;


import org.springframework.stereotype.Service;

import bcs.elearning.backend.models.Training;
import bcs.elearning.backend.repository.TrainingRepository;

@Service
public class TrainingService {
    private final TrainingRepository trainingRepository;

 
    public TrainingService(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    public Training getTrainingById(String trainingId) {
        return trainingRepository.findById(trainingId).orElse(null);
    }
    
    public String getTrainingNameById(String trainingId) {
        Training training = getTrainingById(trainingId);
        if (training != null) {
            return training.getName();
        }
        return null;
    }
    
    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }
}
