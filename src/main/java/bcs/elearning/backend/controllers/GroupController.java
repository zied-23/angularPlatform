package bcs.elearning.backend.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bcs.elearning.backend.models.Group;
import bcs.elearning.backend.security.services.GroupService;
import bcs.elearning.backend.security.services.TrainingService;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/groups")
public class GroupController {
    private final GroupService groupService;
    @Autowired
    private TrainingService trainingService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }
   

    @PostMapping
    public ResponseEntity<Group> createGroup(@RequestBody Group group, HttpServletRequest request) {
        //String token = request.getHeader("Authorization");
        //System.out.println("Received JWT token: " + token);
    	group.setCreationDate(new Date());
        Group createdGroup = groupService.createGroup(group);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGroup);
    }
    @GetMapping(params = "trainingId")
    public ResponseEntity<List<Group>> getGroupsByTraining(@RequestParam("trainingId") String trainingId) {
        List<Group> groups = groupService.getGroupsByTraining(trainingId);
        
        // Retrieve the name of the training for each group
        for (Group group : groups) {
            String trainingName = trainingService.getTrainingNameById(group.getTrainingId());
            group.setTrainingId(trainingName);
        }
        
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Group> getGroupByName(@PathVariable("name") String name) {
        Group group = groupService.getGroupByName(name);
        if (group != null) {
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/group/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable("id") String id) {
        Group group = groupService.getGroupById(id);
        if (group != null) {
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    @PostMapping("/{groupId}/users/{userId}")
    public ResponseEntity<String> addUserToGroup(@PathVariable("groupId") String groupId,
                                                 @PathVariable("userId") String userId) {
        groupService.addUserToGroup(groupId, userId);
        return ResponseEntity.ok("User added to the group successfully.");
    }

    @DeleteMapping("/{groupId}/users/{userId}")
    public void removeUserFromGroup(@PathVariable("groupId") String groupId,
                                    @PathVariable("userId") String userId) {
        groupService.removeUserFromGroup(groupId, userId);
    }
}

