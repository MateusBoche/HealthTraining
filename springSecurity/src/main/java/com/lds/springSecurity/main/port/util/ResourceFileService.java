package com.lds.springSecurity.main.port.util;

import java.io.IOException;

public interface ResourceFileService {
  String read(final String resoucePath) throws IOException;
}
