package com.lds.springSecurity.main.service.util;

import com.lds.springSecurity.main.port.util.ResourceFileService;
import org.springframework.stereotype.Service;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;


@Service
public class ResourceFileHandlerService implements ResourceFileService {
  @Override
  public String read(String resoucePath) throws IOException {
    final ClassLoader classLoader = ResourceFileHandlerService.class.getClassLoader();
    InputStream inputStream = classLoader.getResourceAsStream((resoucePath));

    if (inputStream == null) {
      throw new RuntimeException("Arquivo nao encontrado");
    }

    final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
    String content = "";
    String line;
    while ((line = bufferedReader.readLine()) != null) {
      System.out.println(line);
      content += line;
    }

    return content;
  }
}





