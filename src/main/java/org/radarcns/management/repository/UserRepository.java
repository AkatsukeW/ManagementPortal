package org.radarcns.management.repository;

import org.radarcns.management.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 */
@RepositoryDefinition(domainClass = User.class, idClass = Long.class)
public interface UserRepository extends JpaRepository<User, Long>,
        RevisionRepository<User, Long, Integer> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivated(boolean activated);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmail(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "roles")
    Optional<User> findOneWithRolesByLogin(String login);

    Page<User> findAllByLoginNot(Pageable pageable, String login);

    @Query("select user from User user join user.roles roles "
            + " where roles.project.projectName = :projectName "
            + " and roles.authority.name = :authority")
    Page<User> findAllByProjectNameAndAuthority(Pageable pageable,
            @Param("projectName") String projectName, @Param("authority") String authority);

    @Query("select user from User user join user.roles roles "
            + "where roles.authority.name = :authority")
    Page<User> findAllByAuthority(Pageable pageable, @Param("authority") String authority);

    @Query("select user from User user join user.roles roles "
            + " where roles.project.projectName = :projectName ")
    Page<User> findAllByProjectName(Pageable pageable, String projectName);
}
