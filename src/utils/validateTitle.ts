export function validateTitle(title: string): string | null {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return 'Title cannot be empty.'
  }

  if (trimmedTitle.length > 30) {
    return 'Title cannot be longer than 30 characters.'
  }

  return null
}
