

export default function response(res: any, code: number, message: string) {
  return res.status(code).json({ message: message });
}
