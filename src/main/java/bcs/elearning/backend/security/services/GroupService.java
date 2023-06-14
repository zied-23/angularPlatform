package bcs.elearning.backend.security.services;

import java.util.List;

import bcs.elearning.backend.models.Group;

public interface GroupService {
	Group createGroup(Group group);
    Group getGroupById(String id);
    Group getGroupByName(String name);
    List<Group> getAllGroups();
    void addUserToGroup(String groupId, String userId);
    void removeUserFromGroup(String groupId, String userId);
    List<Group> getGroupsByTraining(String trainingId);
   
}
