package bcs.elearning.backend.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.internal.bulk.UpdateRequest;

import bcs.elearning.backend.models.Coach;
import bcs.elearning.backend.models.ERole;
import bcs.elearning.backend.models.Role;
import bcs.elearning.backend.models.Student;
import bcs.elearning.backend.models.User;
import bcs.elearning.backend.payload.request.SignupRequest;
import bcs.elearning.backend.payload.response.MessageResponse;
import bcs.elearning.backend.repository.RoleRepository;
import bcs.elearning.backend.repository.UserRepository;
import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/students")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody SignupRequest signUpRequest) {
    	if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

        Student student = new Student(signUpRequest.getUsername(),
                                      signUpRequest.getEmail(),
                                      encoder.encode(signUpRequest.getPassword()),
         							 	signUpRequest.getPhone(),
         							 signUpRequest.getFullname()
                                      );
        student.setStatus(Student.ProductStatus.PENDING);

        // Set user roles to ROLE_USER and ROLE_STUDENT
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Role studentRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        roles.add(studentRole);
        student.setRoles(roles);

        // Save the student
        userRepository.save(student);

        return ResponseEntity.ok(new MessageResponse("Student registered successfully!"));
    }

    @PostMapping("/coaches")
    public ResponseEntity<?> registerCoach(@Valid @RequestBody SignupRequest signUpRequest) {
    	if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

        Coach coach = new Coach(signUpRequest.getUsername(),
                                signUpRequest.getEmail(),
                                encoder.encode(signUpRequest.getPassword()),                               
   							 signUpRequest.getPhone(),
   							 signUpRequest.getFullname());
                               
        coach.setJoinDate(new Date());
        coach.setCv(coach.getCv());

        // Set user roles to ROLE_USER and ROLE_COACH
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Role coachRole = roleRepository.findByName(ERole.ROLE_COACH)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        roles.add(coachRole);
        coach.setRoles(roles);

        // Save the coach
        userRepository.save(coach);

        return ResponseEntity.ok(new MessageResponse("Coach registered successfully!"));
    }

    @GetMapping("/users/roles/{roleName}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable("roleName") String roleName) {
        Role role = roleRepository.findByName(ERole.valueOf(roleName.toUpperCase()))
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        
        List<User> users = userRepository.findByRolesId(role.getId());
        return ResponseEntity.ok(users);
    }
    @PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable("id") String id,
                                           @RequestBody Student student) {
        Optional<User> optionalStudent = userRepository.findById(id);
        if (optionalStudent.isPresent()) {
            User existingStudent = optionalStudent.get();
            ((Student) existingStudent).setStatus(student.getStatus());
            userRepository.save(existingStudent);
            return ResponseEntity.ok(new MessageResponse("Student updated successfully!"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable("id") String id) {
        Optional<User> optionalStudent = userRepository.findById(id);
        if (optionalStudent.isPresent()) {
            User student = optionalStudent.get();
            if (student instanceof Student) {
                return ResponseEntity.ok((Student) student);
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: User is not a student."));
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/coaches/{id}")
    public ResponseEntity<?> getCoachById(@PathVariable("id") String id) {
        Optional<User> optionalCoach = userRepository.findById(id);
        if (optionalCoach.isPresent()) {
            User coach = optionalCoach.get();
            if (coach instanceof Coach) {
                return ResponseEntity.ok((Coach) coach);
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: User is not a student."));
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    /*@PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable("id") String id,
                                           @Valid @RequestBody UpdateRequest updateRequest) {
       

        return ResponseEntity.ok(new MessageResponse("Student updated successfully!"));
    }*/

    @PutMapping("/coaches/{id}")
    public ResponseEntity<?> updateCoach(@PathVariable("id") String id,
                                         @Valid @RequestBody UpdateRequest updateRequest) {
      

        return ResponseEntity.ok(new MessageResponse("Coach updated successfully!"));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> removeStudent(@PathVariable("id") String id) {
       

        return ResponseEntity.ok(new MessageResponse("Student removed successfully!"));
    }

    @DeleteMapping("/coaches/{id}")
    public ResponseEntity<?> removeCoach(@PathVariable("id") String id) {
       

        return ResponseEntity.ok(new MessageResponse("Coach removed successfully!"));
    }

    

}
