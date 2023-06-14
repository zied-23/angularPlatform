package bcs.elearning.backend.security.services;

import java.util.List;

import org.springframework.stereotype.Service;

import bcs.elearning.backend.models.Group;
import bcs.elearning.backend.repository.GroupRepository;

@Service
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;

    public GroupServiceImpl(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    @Override
    public Group getGroupById(String id) {
        return groupRepository.findById(id).orElse(null);
    }
    
    @Override
    public Group getGroupByName(String name) {
        return groupRepository.findByName(name).orElse(null);
    }
    
    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public void addUserToGroup(String groupId, String userId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group != null) {
            if (!group.getUserIds().contains(userId)) {
                group.getUserIds().add(userId);
                groupRepository.save(group);
            }
        }
    }
    
    @Override
    public List<Group> getGroupsByTraining(String trainingId) {
        return groupRepository.getGroupsByTrainingId(trainingId);
    }

    @Override
    public void removeUserFromGroup(String groupId, String userId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group != null) {
            group.getUserIds().remove(userId);
            groupRepository.save(group);
        }
    }
}