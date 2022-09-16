export default function Badge() {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          width: 8,
          height: 8,
          borderRadius: "50%",
          top: 2,
          right: 2,
          border: "1px solid white",
        },
      },
    },
  };
}
