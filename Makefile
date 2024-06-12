# Makefile for generating Doxygen documentation

# Variables
DOXYGEN_CONFIG  := other/Doxyfile
DOXYGEN_OUTPUT  := docs
DOXYGEN         := doxygen

# Targets
all: docs

docs:
	@echo "Generating Doxygen documentation..."
	$(DOXYGEN) $(DOXYGEN_CONFIG)

clean:
	@echo "Cleaning up generated documentation..."
	rm -rf $(DOXYGEN_OUTPUT)

.PHONY: all docs clean
