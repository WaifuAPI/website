// components/LoadingSpinner.js

const AnimatedDot = () => {
  return (
    <div class="flex space-x-2 justify-center items-center dark:invert">
      <span class="sr-only">Loading...</span>
      <div class="h-4 w-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-4 w-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-4 w-4 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default AnimatedDot;
