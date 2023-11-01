cmake_minimum_required(VERSION 3.0)
project(Pix)

add_definitions(-DNAPI_VERSION=4)

set(CMAKE_CXX_STANDARD 23)

set(CMAKE_JS_LIB C:/Users/$ENV{USERNAME}/.cmake-js/node-x64/v18.17.1/win-x64/node.lib)
set(CMAKE_JS_INC C:/Users/$ENV{USERNAME}/.cmake-js/node-x64/v18.17.1/include/node)

add_subdirectory(pix)

set(TOOLS ${CMAKE_CURRENT_SOURCE_DIR}/tools)

add_library(
    Pix
    SHARED
    main.cpp
    methods/Generate.cpp
    methods/Generate.h
    methods/Validate.cpp
    methods/Validate.h
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    add_custom_command(
        TARGET Pix
        PRE_BUILD
        COMMAND ${TOOLS}/rm -rf ${CMAKE_CURRENT_SOURCE_DIR}/build/$<TARGET_FILE_NAME:GPix>
        COMMAND ${TOOLS}/rm -rf ${CMAKE_CURRENT_SOURCE_DIR}/build/Pix.node
    )

    add_custom_command(
        TARGET Pix
        POST_BUILD
        COMMAND ${TOOLS}/cp $<TARGET_FILE:GPix> ${CMAKE_CURRENT_SOURCE_DIR}/build/$<TARGET_FILE_NAME:GPix>
        COMMAND ${TOOLS}/cp $<TARGET_FILE:Pix> ${CMAKE_CURRENT_SOURCE_DIR}/build/Pix.node
    )
endif()

# Include Node-API wrappers
execute_process(
    COMMAND node -p "require('node-addon-api').include"
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    OUTPUT_VARIABLE NODE_ADDON_API_DIR
)
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(Pix PUBLIC ${NODE_ADDON_API_DIR} ${CMAKE_JS_INC})

target_link_libraries(Pix PUBLIC ${CMAKE_JS_LIB} c++ GPix)

target_link_options(Pix PUBLIC -static)