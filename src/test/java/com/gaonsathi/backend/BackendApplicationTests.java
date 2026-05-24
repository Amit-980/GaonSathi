package com.gaonsathi.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BackendApplicationTests {

    @Test
    void testControllerReturnsHealthMessages() {
        TestController controller = new TestController();

        assertEquals("Backend is working 🚀", controller.home());
        assertEquals("Hello Amit 👋", controller.hello());
    }
}
