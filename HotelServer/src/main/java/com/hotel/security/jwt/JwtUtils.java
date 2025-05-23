package com.hotel.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.hotel.service.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	public static String usrenmaefortoken = null;

	@Value("${demo.app.jwtSecret}")
	private String jwtSecret;

	@Value("${demo.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	 public String generateJwtToken(Authentication authentication) {
	        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

	        List<String> roles = userPrincipal.getAuthorities().stream()
	                .map(GrantedAuthority::getAuthority)
	                .collect(Collectors.toList());
	        System.out.println(roles);

	        return Jwts.builder()
	                .setSubject(userPrincipal.getUsername())
	                .claim("roles", roles)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
	                .signWith(key(), SignatureAlgorithm.HS256)
	                .compact();
	    }
	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}

	public String getUserNameFromJwtToken(String token) {
		usrenmaefortoken = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody()
				.getSubject();
		return usrenmaefortoken;
	}

	public Long getUserIdFromJwtToken(String token) {
		Long userId = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().get("userId",
				Long.class); // Extract userId from the claims
		return userId;
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
			return true;
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}

	public ResponseCookie getCleanJwtCookie() {
		return ResponseCookie.from("jwt", "").httpOnly(true).secure(true).path("/").maxAge(0).build();
	}
}
