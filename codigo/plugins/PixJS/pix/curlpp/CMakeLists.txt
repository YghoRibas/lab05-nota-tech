cmake_minimum_required(VERSION 3.25)
project(curlpp)

if(MSVC)
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} /SAFESEH:NO")
    set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} /SAFESEH:NO")
    set(CMAKE_MODULE_LINKER_FLAGS "${CMAKE_MODULE_LINKER_FLAGS} /SAFESEH:NO")
endif()

# In response to CMake 3.0 generating warnings regarding policy CMP0042,
# the OSX RPATH settings have been updated per recommendations found
# in the CMake Wiki:
#  http://www.cmake.org/Wiki/CMake_RPATH_handling#Mac_OS_X_and_the_RPATH
if(POLICY CMP0042)
    cmake_policy(SET CMP0042 NEW) # MACOSX_RPATH
    set(CMAKE_MACOSX_RPATH TRUE)
endif()

# for unix platform, define install directories.
include(GNUInstallDirs)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_C_STANDARD 23)

# extra (pkg-config-related files)
add_subdirectory(extras)

#########################################################################################
# Look for dependencies

#########################################################################################
# Define Targets

# If building on windows, install path will be in build/winbuild
if(CMAKE_SYSTEM MATCHES "Windows")
   set(CMAKE_INSTALL_PREFIX "winbuild")
endif()

file(GLOB_RECURSE HeaderFileList "${CMAKE_CURRENT_SOURCE_DIR}/include/*")
file(GLOB_RECURSE SourceFileList "${CMAKE_CURRENT_SOURCE_DIR}/src/*")
add_library(${PROJECT_NAME} SHARED ${HeaderFileList} ${SourceFileList})
add_library(${PROJECT_NAME}_st STATIC ${HeaderFileList} ${SourceFileList})

set(DEPS
    C:/msys64/clang64/lib/libcurl.a
    C:/msys64/clang64/lib/libnghttp2.a
    C:/msys64/clang64/lib/libidn2.a
    C:/msys64/clang64/lib/libssh2.a
    C:/msys64/clang64/lib/libpsl.a
    C:/msys64/clang64/lib/libbcrypt.a
    C:/msys64/clang64/lib/libadvapi32.a
    C:/msys64/clang64/lib/libcrypt32.a
    C:/msys64/clang64/lib/libssl.a
    C:/msys64/clang64/lib/libcrypto.a
    C:/msys64/clang64/lib/libgdi32.a
    C:/msys64/clang64/lib/libwldap32.a
    C:/msys64/clang64/lib/libzstd.a
    C:/msys64/clang64/lib/libbrotlidec.a
    C:/msys64/clang64/lib/libz.a
    C:/msys64/clang64/lib/libws2_32.a
    C:/msys64/clang64/lib/libiconv.a
    C:/msys64/clang64/lib/libunistring.a
    C:/msys64/clang64/lib/libbrotlicommon.a
)

target_link_libraries(${PROJECT_NAME} PUBLIC ${DEPS})
target_link_libraries(${PROJECT_NAME}_st PUBLIC ${DEPS})

target_link_options(${PROJECT_NAME} PUBLIC -static)
target_link_options(${PROJECT_NAME}_st PUBLIC -static)

# All following targets should search these directories for headers
target_include_directories(
    ${PROJECT_NAME}
    PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CURL_INCLUDE_DIRS}
)

target_include_directories(
    ${PROJECT_NAME}_st
    PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CURL_INCLUDE_DIRS}
)