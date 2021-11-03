package org.radarbase.management.web.rest;

import static org.radarbase.auth.authorization.Permission.AUTHORITY_READ;
import static org.radarbase.auth.authorization.RadarAuthorization.checkPermission;

import io.micrometer.core.annotation.Timed;
import java.util.Arrays;
import java.util.List;
import org.radarbase.auth.authorization.AuthoritiesConstants;
import org.radarbase.auth.exception.NotAuthorizedException;
import org.radarbase.auth.token.RadarToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing Authority.
 */
@RestController
@RequestMapping("/api")
public class AuthorityResource {
    @Autowired
    private RadarToken token;

    private static final Logger log = LoggerFactory.getLogger(AuthorityResource.class);

    /**
     * GET  /authorities : get all the authorities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of authorities in body
     */
    @GetMapping("/authorities")
    @Timed
    public List<String> getAllAuthorities() throws NotAuthorizedException {
        log.debug("REST request to get all Authorities");
        checkPermission(token, AUTHORITY_READ);
        return Arrays.asList(AuthoritiesConstants.PROJECT_ADMIN, AuthoritiesConstants.PROJECT_OWNER,
                AuthoritiesConstants.PROJECT_AFFILIATE, AuthoritiesConstants.PROJECT_ANALYST);
    }

}
