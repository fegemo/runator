CC		=	g++.exe
CFLAGS	=	-I.
SRCS	=	$(wildcard *.c)
OBJS	=	$(patsubst %.c,%.o,$(SRCS))

.PHONY: all clean 

all: depend programa.exe

depend: $(SRCS)
		del .depend 2>NUL
		$(CC) $(CFLAGS) $(SRCS) -MM >> .depend

-include .depend

%.o: %.c
	$(CC) -c -o $@ $< $(CFLAGS)
	
programa.exe:	$(OBJS)
	$(CC) -o $@ $^ -lfreeglut -lopengl32 -lglu32
	
clean:
		del *.o 2>NUL
		del *.exe 2>NUL
		del .depend 2>NUL