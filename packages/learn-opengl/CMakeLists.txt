cmake_minimum_required(VERSION 2.8)
project(learn_opengl)

set(CMAKE_VERBOSE_MAKEFILE OFF)

include_directories(/usr/local/include)
aux_source_directory("./" SRCS)

set(CMAKE_CXX_FLAGS "-g -std=c++11 -Wformat")

link_directories(/usr/local/Cellar/glew/2.2.0_1/lib)
link_directories(/usr/local/Cellar/glfw/3.3.6/lib)
add_executable(learn_opengl ${SRCS} ${HDRS})
target_link_libraries(learn_opengl ${GLFW_STATIC_LIBRARIES})

if (APPLE)
  target_link_libraries(learn_opengl "-framework OpenGL")
endif()

target_link_libraries(learn_opengl GLEW)
target_link_libraries(learn_opengl GLFW)