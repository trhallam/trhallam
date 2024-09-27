# SEGY-SAK

[![Version](https://img.shields.io/pypi/v/segysak?color=2d5016&label=pypi_version&logo=Python&logoColor=white)](https://pypi.org/project/segysak/)

<img src="https://github.com/trhallam/segysak/raw/main/docs/figures/logo.png" alt="SEGY-SAK logo" width="400" role="img" align="right" class="img-right"></img>

[SEGY-SAK](https://github.com/trhallam/segysak) was a personal project I've developed and maintained from 
my PhD. The project links the work
of [segyio](https://github.com/equinor/segyio) a C library with a Python wrapper for reading SEG-Y 
files to [Xarray](https://github.com/pydata/xarray).

[SEG-Y files](https://en.wikipedia.org/wiki/SEG-Y) are an old and esoteric file format developed when magnetic tapes were used to store 
seismic data. The files are linear in their data layout with headers for each scope, (e.g. file headers and
trace headers). You can find out more from the SEG [technical standards library](https://library.seg.org/seg-technical-standards), particularly in revision `SEG-Y_r2.1`.

SEGY-SAK makes the loading of the SEG-Y data easier by abstracting the linear nature of the file format
and presenting the data to the user in simpler and labelled arrays using Xarray. It also implements a
lazy backend as some SEG-Y files can reach Gb in size.

You can find out more at the [repo](https://github.com/trhallam/segysak) or in the 
[documentation](https://trhallam.github.io/segysak/latest/).
