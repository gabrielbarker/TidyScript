# CodeAnalyzer [![Build Status](https://travis-ci.com/gabrielbarker/CodeAnalyzer.svg?branch=master)](https://travis-ci.com/gabrielbarker/CodeAnalyzer) [![codecov](https://codecov.io/gh/gabrielbarker/CodeAnalyzer/branch/master/graph/badge.svg)](https://codecov.io/gh/gabrielbarker/CodeAnalyzer)

A tool that analyses your code based on function length and indentation depth, checking for basic code smells. The tool can be configured via a JSON config that sets limits on the length, in lines, of certain code block types, like functions, loops and classes. You can also set limits on the total number of occurences of these types in a given file. This is useful for reducing the number of conditionals in your code or reducing the number of functions in a class. The data is then displayed in table form in the terminal, using Taybl.

Currently only Java-esque languages are fully supported, however most curly bracket languages will have a decent level of utility.
