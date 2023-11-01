cmake_minimum_required(VERSION 3.0)
project(Pix)

set(CMAKE_CXX_STANDARD 23)

add_definitions(-DCURL_STATICLIB)

file(GLOB_RECURSE v_pix_SRC "implementations/*.cpp")

add_subdirectory(libs/QrToPng)

# All following targets should search these directories for headers
include_directories(
    "C:/msys64/clang64/include"
)

cmake_policy(SET CMP0135 NEW)

include(FetchContent)

FetchContent_Declare(json URL https://github.com/nlohmann/json/releases/download/v3.11.2/json.tar.xz)
FetchContent_MakeAvailable(json)

add_subdirectory(curlpp)

add_library(GPix SHARED ${v_pix_SRC} Helper.cpp Request.cpp)

target_link_libraries(
    GPix
    PUBLIC
    nlohmann_json::nlohmann_json
    qr-to-png_static_lib
    curlpp_st
    c++
)

target_link_options(
    GPix
    PUBLIC
    -static
)

target_include_directories(GPix PUBLIC include)