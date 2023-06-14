package bcs.elearning.backend.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bcs.elearning.backend.models.Training;
import bcs.elearning.backend.repository.TrainingRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/trainings")
public class TrainingController {
    private final TrainingRepository trainingRepository;

    public TrainingController(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    @PostMapping
    public ResponseEntity<Training> createTraining(@RequestBody Training training) {
    	training.setCreateDate(new Date());
        Training createdTraining = trainingRepository.save(training);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTraining);
    }

    @GetMapping
    public ResponseEntity<List<Training>> getAllTrainings() {
        List<Training> trainings = trainingRepository.findAll();
        return ResponseEntity.ok(trainings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Training> getTrainingById(@PathVariable("id") String id) {
        Training training = trainingRepository.findById(id).orElse(null);
        if (training != null) {
            return ResponseEntity.ok(training);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Training> updateTraining(@PathVariable("id") String id, @RequestBody Training updatedTraining) {
        Training training = trainingRepository.findById(id).orElse(null);
        if (training != null) {
            training.setName(updatedTraining.getName());
            training.setDescription(updatedTraining.getDescription());
            training.setTrainingCh(updatedTraining.getTrainingCh());
            training.setNumberOfEx(updatedTraining.getNumberOfEx());
            training.setCreateDate(updatedTraining.getCreateDate()); // Include the createDate field

            Training savedTraining = trainingRepository.save(training);
            return ResponseEntity.ok(savedTraining);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTraining(@PathVariable("id") String id) {
        Training training = trainingRepository.findById(id).orElse(null);
        if (training != null) {
            trainingRepository.delete(training);
            return ResponseEntity.ok("Training deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }
}
