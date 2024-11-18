package com.lds.springSecurity.main.dao.postgres.configuration;



import com.lds.springSecurity.main.port.util.ResourceFileService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.*;

@Configuration
@Profile({"ldsSecurity"})
public class PostgresConnectionManagerConfiguration {
  @Value("${spring.datasource.base.url}")
  private String databaseBaseUrl;

  @Value("${spring.datasource.url}")
  private String databaseUrl;

  @Value("${spring.datasource.username}")
  private String databaseBaseUsername;

  @Value("${spring.datasource.password}")
  private String databaseBasePassword;

  @Value("${spring.datasource.name}")
  private String databaseName;

  @Bean
  public DataSource dataSource() throws SQLException {
    final DataSource build = DataSourceBuilder
      .create()
      .url(databaseBaseUrl)
      .username(databaseBaseUsername)
      .password(databaseBasePassword)
      .build();
    final Connection connection = build.getConnection();
    createDatabaseIfNotExists(connection);
    return build;
  }

  private void createDatabaseIfNotExists(Connection connection) throws SQLException {
    final Statement statement = connection.createStatement();
    String sql = "SELECT COUNT(*) AS dbs ";
    sql += " FROM pg_catalog.pg_database ";
    sql += " WHERE lower(datname)= '" + databaseName + "';";

    ResultSet resultSet = statement.executeQuery(sql);
    boolean dbExist = resultSet.next();
    if (!dbExist || resultSet.getInt("dbs") == 0) {
      String cerateDbsql = " CREATE DATABASE " + databaseName + " WITH ";
      cerateDbsql += " OWNER = postgres ENCODING = 'UTF8' ";
      cerateDbsql += " CONNECTION LIMIT = -1; ";

      PreparedStatement preparedStatement = connection.prepareStatement(cerateDbsql);
      preparedStatement.executeUpdate();
      preparedStatement.close();
    }

  }

  @Bean
  @DependsOn("dataSource")
  public Connection getConnection() throws SQLException {
    HikariConfig hikariConfig = new HikariConfig();
    hikariConfig.setJdbcUrl(databaseUrl);
    hikariConfig.setUsername(databaseBaseUsername);
    hikariConfig.setPassword(databaseBasePassword);
    return new HikariDataSource(hikariConfig).getConnection();
  }

  @Autowired
  private ResourceFileService resourceFileService;

  @Bean
  @DependsOn("getConnection")
  public boolean createTableAndInsertData() throws SQLException, IOException {
    Connection connection = getConnection();
    final String basePath = "lds-db-scripts";
    final String createTable = resourceFileService.read(basePath + "/create-tables-postgres.sql");
    PreparedStatement createStatement = connection.prepareStatement(createTable);
    createStatement.executeUpdate();
    createStatement.close();

    final String insertData = resourceFileService.read(basePath + "/insert-data.sql");
    PreparedStatement insertStatement = connection.prepareStatement(insertData);
    insertStatement.execute();
    insertStatement.close();
    return true;
  }


}
