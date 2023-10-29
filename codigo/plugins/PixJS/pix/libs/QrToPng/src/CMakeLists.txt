set(BINARY qr-to-png)

file(GLOB_RECURSE SOURCES LIST_DIRECTORIES true *.h *.cpp)

add_executable(${BINARY} ${SOURCES})
target_include_directories(${BINARY} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(${BINARY}
        tinypngoutput
        qr-code-generator)

add_library(${BINARY}_static_lib STATIC ${SOURCES})
target_include_directories(${BINARY}_static_lib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(${BINARY}_static_lib
        tinypngoutput
        qr-code-generator)

target_link_options(${BINARY}_static_lib PUBLIC -static)